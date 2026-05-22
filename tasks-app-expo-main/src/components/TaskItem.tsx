import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

import { TaskItem as TaskType } from '../utils/handle-api';
import { useTaskStore } from '../store/useTaskStore';

interface TaskItemProps {
  task: TaskType;
  updateMode: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <TouchableOpacity
      style={styles.task}
      onPress={() => router.push(`/task/${task._id}`)}
    >
      <Text style={styles.text}>{task.text}</Text>

      <TouchableOpacity onPress={() => deleteTask(task._id)}>
        <AntDesign name="delete" size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  task: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TaskItem;
