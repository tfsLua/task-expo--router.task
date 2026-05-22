import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTaskStore } from '../../src/store/useTaskStore';

export default function TaskDetails() {
  const { id } = useLocalSearchParams();

  const task = useTaskStore((state) =>
    state.tasks.find((item) => item._id === id)
  );

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Tarefa não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.text}</Text>

      <Text>
        Status: {task.completed ? 'Concluída' : 'Pendente'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
