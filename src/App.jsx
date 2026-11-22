// App - keeps all the state (useState) and builds the page from the components.
import { initialMembers, initialTasks } from './data.js'
import styles from './App.module.css'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import FilterBar from './components/FilterBar/FilterBar.jsx'
import MembersList from './components/MembersList/MembersList.jsx'
import TasksPanel from './components/TasksPanel/TasksPanel.jsx'
import Notice from './components/Notice/Notice.jsx'
import { useState } from 'react'

export default function App() {
  // TODO: state (useState):
  //   members          - start with initialMembers
  const [members, setMembers] = useState(initialMembers)

  //   tasks            - start with initialTasks
  const [tasks, setTasks] = useState(initialTasks)

  //   selectedMemberId - start with null
  const [selectedMemberId, setSelectedMemberId] = useState(null)

  //   showOnlyActive   - start with false
  const [showOnlyActive, setShowOnlyActive] = useState(false)

  //   layout           - start with "list"
  const [layout, setLayout] = useState('list')

  // TODO: compute the members to show, the selected member and their tasks

  const membersToShow = showOnlyActive
    ? members.filter((member) => member.isActive)
    : members

  const selectedMember =
    members.find((member) => member.id === selectedMemberId) || null

  const selectedTasks = selectedMember
    ? tasks.filter((task) => task.assignedTo === selectedMember.id)
    : []

  const onToggleActive = () => {
    setShowOnlyActive((prev) => !prev)
  }

  const onLayoutChange = (layout) => {
    setLayout(layout)
  }

  const onToggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    )
  }

  // TODO: render: Header, FilterBar, Notice (only when needed), MembersList, TasksPanel, Footer
  return (
    <div className={styles.app}>
      <Header />

      <FilterBar
        showOnlyActive={showOnlyActive}
        onToggleActive={onToggleActive}
        layout={layout}
        onLayoutChange={onLayoutChange}
      />

      <MembersList
        members={membersToShow}
        layout={layout}
        selectedMemberId={selectedMemberId}
        onSelect={setSelectedMemberId}
      />
      {selectedMember && !selectedMember.isActive && (
        <Notice type="warning">{selectedMember.name} is inactive.</Notice>
      )}
      <TasksPanel
        member={selectedMember}
        tasks={selectedTasks}
        onToggleTask={onToggleTask}
      />

      <Footer />
      {/* TODO */}
    </div>
  )
}
