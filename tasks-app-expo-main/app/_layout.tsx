import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Minhas Tarefas',
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configurações',
        }}
      />
    </Tabs>
  );
}
