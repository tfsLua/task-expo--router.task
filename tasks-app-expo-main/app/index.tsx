import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';

import TaskList from '../src/components/TaskList';
import { useTaskStore } from '../src/store/useTaskStore';

export default function HomeScreen() {
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const addTask = useTaskStore((state) => state.addTask);

  const [text, setText] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = () => {
    if (!text.trim()) return;

    addTask(text, false, null, () => setText(''));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Minhas Tarefas</Text>

      <View style={styles.inputContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Nova tarefa"
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.counter}>
        Total de tarefas: {tasks.length}
      </Text>

      <TaskList filter="all" onUpdate={() => {}} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  inputContainer: {
    flexDirection: 'row',
    gap: 10,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },

  button: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  counter: {
    marginTop: 20,
    marginBottom: 10,
  },
});
