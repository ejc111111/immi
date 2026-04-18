import './MoodPicker.css'

const MOODS = [
  { id: 'numb',  emoji: '😶', label: 'Numb'  },
  { id: 'low',   emoji: '😔', label: 'Low'   },
  { id: 'tense', emoji: '😤', label: 'Tense' },
  { id: 'flat',  emoji: '😐', label: 'Flat'  },
  { id: 'okay',  emoji: '🙂', label: 'Okay'  },
  { id: 'heavy', emoji: '🥺', label: 'Heavy' },
]

export default function MoodPicker({ selected, onChange }) {
  return (
    <div className="mp" role="group" aria-label="Mood selection">
      {MOODS.map(({ id, emoji, label }) => (
        <button
          key={id}
          className={`mp__item${selected === id ? ' mp__item--selected' : ''}`}
          onClick={() => onChange(id)}
          aria-pressed={selected === id}
        >
          <span className="mp__emoji" aria-hidden="true">{emoji}</span>
          <span className="mp__label">{label}</span>
        </button>
      ))}
    </div>
  )
}
