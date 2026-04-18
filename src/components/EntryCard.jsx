import './EntryCard.css'

/**
 * entry shape:
 *   date        string   "Today" | "Mar 12"
 *   mood        { emoji, label }
 *   quote       string   — the diary text excerpt
 *   note        string | null
 *   isFirst     bool
 *   hasVoice    bool
 *   voiceDuration  string | null   "0:32"
 */
export default function EntryCard({ entry }) {
  const { date, mood, quote, note, isFirst, hasVoice, voiceDuration } = entry

  return (
    <div className="ec">
      {/* Date + emoji */}
      <div className="ec__top">
        <span className="ec__date">{date}</span>
        <span className="ec__emoji" aria-label={mood.label}>{mood.emoji}</span>
      </div>

      {/* Quote */}
      <p className="ec__quote">&ldquo;{quote}&rdquo;</p>

      {/* Optional note */}
      {note && <p className="ec__note">{note}</p>}

      {/* Footer */}
      <div className="ec__footer">
        <div className="ec__footer-left">
          <span className="ec__mood-tag">{mood.label}</span>
          {isFirst && <span className="ec__first-label">First entry</span>}
        </div>
        {hasVoice && (
          <span className="ec__voice">
            🎙 {voiceDuration}
          </span>
        )}
      </div>
    </div>
  )
}
