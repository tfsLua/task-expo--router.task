import React, { useMemo } from 'react';
import { SectionList, StyleSheet, View, Text } from 'react-native';
import TaskItem from './TaskItem';
import { useTaskStore } from '../store/useTaskStore';

interface TaskListProps {
  filter: 'all' | 'completed' | 'pending';
  onUpdate: (task: any) => void;
}

const TaskList: React.FC<TaskListProps> = ({ filter, onUpdate }) => {
  const tasks = useTaskStore((state) => state.tasks);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  return (
    <View style={styles.listContainer}>
      <SectionList
        sections={[
          {
            title: 'Tarefas',
            data: filteredTasks,
          },
        ]}
        keyExtractor={(item) => item._id}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <TaskItem task={item} updateMode={() => onUpdate(item)} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 20,
  },

  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default TaskList;
