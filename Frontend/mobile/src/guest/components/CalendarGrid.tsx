import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  currentDate?: Date;
  selectedDate?: Date | null;
  minimumDate?: Date;
  onSelect: (date: Date) => void;
};

const dateOnly = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
const dateKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

export default function CalendarGrid({ currentDate, selectedDate = null, minimumDate, onSelect }: Props) {
  const [calendarMonth, setCalendarMonth] = useState(() => currentDate || new Date());
  const currentDateKey = currentDate ? dateKey(currentDate) : '';

  useEffect(() => {
    if (currentDate) setCalendarMonth(currentDate);
  }, [currentDateKey]);

  const firstDay = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  const calendarCells: Array<number | null> = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)];
  while (calendarCells.length % 7) calendarCells.push(null);

  return (
    <View>
      <View className="mb-5 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1))} accessibilityRole="button" accessibilityLabel="Previous month" className="p-1">
          <Ionicons name="chevron-back" size={22} color="#7C3AED" />
        </TouchableOpacity>
        <Text className="text-base font-bold text-gray-950 dark:text-white">{calendarMonth.toLocaleDateString('en', { month: 'long', year: 'numeric' })}</Text>
        <TouchableOpacity onPress={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1))} accessibilityRole="button" accessibilityLabel="Next month" className="p-1">
          <Ionicons name="chevron-forward" size={22} color="#7C3AED" />
        </TouchableOpacity>
      </View>
      <View className="mb-2 flex-row">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <Text key={`${day}-${index}`} className="w-[14.28%] text-center text-xs font-semibold text-gray-500 dark:text-[#94A3B8]">{day}</Text>
        ))}
      </View>
      <View className="flex-row flex-wrap">
        {calendarCells.map((day, index) => {
          const date = day === null ? null : new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
          const disabled = !date || (minimumDate !== undefined && dateOnly(date) < dateOnly(minimumDate));
          const selected = date !== null && selectedDate !== null && dateOnly(date) === dateOnly(selectedDate);
          const today = date !== null && dateOnly(date) === dateOnly(new Date());

          return (
            <TouchableOpacity
              key={index}
              disabled={disabled}
              onPress={() => date && onSelect(date)}
              accessibilityRole="button"
              accessibilityState={{ selected, disabled }}
              accessibilityLabel={date?.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              className={`h-10 w-[14.28%] items-center justify-center ${selected ? 'rounded-full bg-violet-100 dark:bg-[#4A3F70]' : ''}`}
            >
              <Text className={`text-sm ${disabled ? 'text-gray-300 dark:text-gray-600' : selected ? 'font-bold text-violet-700 dark:text-[#D0BCFF]' : today ? 'font-bold text-[#7C3AED]' : 'text-gray-900 dark:text-white'}`}>
                {day ?? ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
