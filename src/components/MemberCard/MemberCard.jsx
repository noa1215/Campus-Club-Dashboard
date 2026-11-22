// MemberCard - avatar (initials), name, role badge and a small role-colored action button.
import styles from './MemberCard.module.css'

/**
 * @param {object} props
 * @param {{id: number, name: string, role: "Leader" | "Member" | "Guest", isActive: boolean}} props.member
 * @param {boolean} props.isSelected - true when this is the selected member (the card gets styles.selected)
 * @param {(memberId: number) => void} props.onSelect - call it with member.id when the card is clicked
 */
export default function MemberCard({ member, isSelected, onSelect }) {
   const splitName = member.name.split(' ')
  const let1 = splitName[0][0]
  const let2 = splitName[1][0]
  const avatar = let1 + let2

  return (
    <div
      onClick={() => onSelect(member.id)}
      className={`${styles.card} ${!member.isActive ? styles.inactive : ''} ${isSelected ? styles.selected : ''}`}
    >
      <div className={styles.avatar}>{avatar}</div>
      <div className={styles.info}>
        <h2 className={styles.name}>{member.name}</h2>
        <span className={styles.badge}>{member.role}</span>
      </div>
      <button
        type="button"
        disabled={!member.isActive}
        className={`${styles.roleButton} ${styles[member.role.toLowerCase()]}`}
      >
        Contact
      </button>
    </div>
  )
}

 