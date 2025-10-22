import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function FreeTrialScreen() {
  const [reminderEnabled, setReminderEnabled] = useState(false);

  return (
    <ScrollView className="flex-1 bg-gradient-to-br from-gray-100 via-rose-100 to-rose-200">
      <View className="flex-1 p-6">
        {/* Close Button */}
        <TouchableOpacity className="self-start mb-8">
          <Ionicons name="close" size={32} color="#374151" />
        </TouchableOpacity>

        {/* Header */}
        <View className="mb-8">
          <Text className="text-4xl font-bold text-gray-800 mb-2">
            How your free trial works
          </Text>
          <Text className="text-gray-600 text-lg">
            You won't be charged anything today
          </Text>
        </View>

        {/* Timeline Card */}
        <View className="bg-white rounded-3xl p-8 shadow-lg mb-6">
          <View className="relative">
            {/* Timeline Items */}
            <View className="space-y-6">
              {/* Item 1 */}
              <View className="flex-row gap-4 mb-6">
                <View className="relative">
                  <View className="w-10 h-10 bg-teal-500 rounded-full items-center justify-center">
                    <Ionicons name="lock-closed" size={20} color="white" />
                  </View>
                  {/* Vertical line */}
                  <View className="absolute top-10 left-5 w-0.5 h-16 bg-teal-400" />
                </View>
                <View className="flex-1 pt-1">
                  <Text className="text-xl font-bold text-gray-800 mb-1">
                    Today - Free trial starts
                  </Text>
                  <Text className="text-gray-500">
                    Enjoy full access, totally free for your first 3 days
                  </Text>
                </View>
              </View>

              {/* Item 2 */}
              <View className="flex-row gap-4 mb-6">
                <View className="relative">
                  <View className="w-10 h-10 bg-teal-400 rounded-full items-center justify-center">
                    <Ionicons name="notifications" size={20} color="white" />
                  </View>
                  {/* Vertical line */}
                  <View className="absolute top-10 left-5 w-0.5 h-16 bg-teal-300" />
                </View>
                <View className="flex-1 pt-1">
                  <Text className="text-xl font-bold text-gray-800 mb-1">
                    21 Oct - Trial reminder
                  </Text>
                  <Text className="text-gray-500">
                    We'll let you know when your trial is ending
                  </Text>
                </View>
              </View>

              {/* Item 3 */}
              <View className="flex-row gap-4">
                <View className="w-10 h-10 bg-teal-300 rounded-full items-center justify-center">
                  <Ionicons name="diamond" size={20} color="white" />
                </View>
                <View className="flex-1 pt-1">
                  <Text className="text-xl font-bold text-gray-800 mb-1">
                    22 Oct - Become member
                  </Text>
                  <Text className="text-gray-500">
                    Your trial ends unless canceled. Enjoy!
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Reminder Toggle */}
        <View className="bg-white rounded-2xl p-4 flex-row items-center justify-between shadow-sm mb-4">
          <Text className="text-gray-700 font-medium text-base">
            Reminder before trial ends
          </Text>
          <Switch
            value={reminderEnabled}
            onValueChange={setReminderEnabled}
            trackColor={{ false: '#d1d5db', true: '#14b8a6' }}
            thumbColor="white"
          />
        </View>

        {/* CTA Button */}
        <TouchableOpacity className="w-full bg-gray-800 rounded-2xl py-4 mb-4">
          <Text className="text-white text-center text-lg font-semibold">
            Start 3-day free trial now
          </Text>
        </TouchableOpacity>

        {/* Pricing Info */}
        <Text className="text-center text-gray-600 text-sm mb-4">
          ₹416.66/month, billed yearly as{' '}
          <Text className="font-semibold">₹5,000.00/year</Text>
        </Text>

        {/* Footer Links */}
        <View className="flex-row justify-between pt-2">
          <TouchableOpacity>
            <Text className="text-sm text-gray-600">Restore</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-sm text-gray-600">Terms & Conditions</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-sm text-gray-600">Other options</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}