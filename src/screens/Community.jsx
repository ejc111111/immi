import './Community.css'

const POSTS = [
  {
    id: 1,
    subject: "Does it ever stop feeling like a guest?",
    body: "I've been here two years and still feel like I'm borrowing someone else's life. Like I'm waiting for the real residents to come back and ask me to leave…",
    likes: 42, comments: 18, saves: 9,
  },
  {
    id: 2,
    subject: "Missing my mum's cooking more than I expected",
    body: "It's not just the food. It's the smell of the kitchen on a Sunday morning, knowing everyone was coming over. I didn't realise how much of home lived in that…",
    likes: 67, comments: 24, saves: 15,
  },
  {
    id: 3,
    subject: "My colleagues don't get why I'm tired all the time",
    body: "Code switching all day is exhausting. I come home and I don't even know what voice is mine anymore. Has anyone else felt this way at work…",
    likes: 89, comments: 31, saves: 22,
  },
  {
    id: 4,
    subject: "Small wins nobody else understands",
    body: "Today I made a joke in English and people actually laughed. Not out of politeness. That's it. That was my whole day and it was enough…",
    likes: 114, comments: 45, saves: 28,
  },
]

export default function Community() {
  return (
    <div className="com">
      {/* Grain overlay */}
      <svg className="com__grain" aria-hidden="true">
        <filter id="grain-com">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-com)" />
      </svg>

      <div className="com__scroll">
        <div className="com__content">

          <div className="com__header">
            <h1 className="com__heading">Here's what people in your community are saying</h1>
            <p className="com__subtitle">
              Share your experience — there are no wrong answers. No judgement here. Just people who get it.
            </p>
          </div>

          <div className="com__feed">
            {POSTS.map((post, i) => (
              <article
                key={post.id}
                className="com__card"
                style={{ animationDelay: `${0.15 + i * 0.1}s` }}
              >
                <p className="com__card-subject">{post.subject}</p>
                <p className="com__card-body">{post.body}</p>
                <div className="com__card-footer">
                  <span>🤍 {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  <span>🔖 {post.saves}</span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>

      {/* Floating compose button */}
      <button className="com__compose" aria-label="New post">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}
