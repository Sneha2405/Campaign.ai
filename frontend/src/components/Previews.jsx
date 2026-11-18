import React, { useState, useMemo } from 'react'

const tagLine = (tags) => (tags || []).map((t) => (t.startsWith('#') ? t : `#${t}`)).join(' ')

function getCuratedImage(product = '', brand = '') {
  const text = `${product} ${brand}`.toLowerCase()
  if (text.includes('fit') || text.includes('gym') || text.includes('health') || text.includes('workout')) {
    return 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'
  }
  if (text.includes('chai') || text.includes('tea') || text.includes('coffee') || text.includes('cafe')) {
    return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
  }
  if (text.includes('food') || text.includes('meal') || text.includes('lunch') || text.includes('diet') || text.includes('fresh')) {
    return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
  }
  if (text.includes('tech') || text.includes('app') || text.includes('software') || text.includes('saas') || text.includes('ai')) {
    return 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80'
  }
  if (text.includes('cloth') || text.includes('fashion') || text.includes('wear') || text.includes('style')) {
    return 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80'
  }
  return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
}

function Avatar({ name }) {
  return (
    <div className="avatar-ring">
      <div className="avatar">{(name || 'C').slice(0, 1).toUpperCase()}</div>
    </div>
  )
}

function VerifiedBadge() {
  return (
    <svg className="verified-badge" viewBox="0 0 24 24" width="14" height="14" fill="#1d9bf0">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
  )
}

// ── Instagram Mockup ──────────────────────────────────────────────────
export function InstagramPreview({ c, brand, visualUrl, visualMode, liked, toggleLike, likeCount }) {
  const handle = (brand || 'brand').toLowerCase().replace(/[^a-z0-9]/g, '')
  return (
    <div className="phone ig-ad-card">
      {/* IG Header */}
      <div className="ph-head">
        <Avatar name={brand} />
        <div className="ig-user-info">
          <div className="ig-user-row">
            <b>{handle}</b>
            <span className="ig-dot">•</span>
            <span className="ig-follow">Follow</span>
          </div>
          <small className="ig-sponsored">Sponsored</small>
        </div>
        <span className="ig-more">•••</span>
      </div>

      {/* IG Media Container */}
      <div className="ad-visual-wrap">
        {visualMode === 'typography' ? (
          <div className="typo-creative ig-ratio">
            <span className="creative-brand">{brand}</span>
            <h4>{c.headline || 'Your Next Breakthrough'}</h4>
            <span className="creative-tag">{c.call_to_action || 'Learn More'}</span>
          </div>
        ) : (
          <img
            src={visualUrl}
            alt={c.headline || brand}
            className="ad-creative-img ig-ratio"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextSibling.style.display = 'flex'
            }}
          />
        )}
        <div className="ad-fallback-banner typo-creative ig-ratio" style={{ display: 'none' }}>
          <h4>{c.headline || brand}</h4>
          <span className="creative-tag">{c.call_to_action || 'Learn More'}</span>
        </div>
      </div>

      {/* IG Sponsored CTA Strip */}
      <div className="ig-cta-strip">
        <span>{c.call_to_action || 'Learn More'}</span>
        <span className="chevron">›</span>
      </div>

      {/* Action Buttons */}
      <div className="ig-actions-bar">
        <div className="ig-left-actions">
          <button className={`ig-icon-btn ${liked ? 'liked' : ''}`} onClick={toggleLike} title="Like">
            {liked ? '❤️' : '🤍'}
          </button>
          <span className="ig-icon" title="Comment">💬</span>
          <span className="ig-icon" title="Share">✈️</span>
        </div>
        <span className="ig-icon bookmark" title="Save">🔖</span>
      </div>

      {/* Engagement Counter */}
      <div className="ig-social-proof">
        <span>Liked by <b>alex_growth</b> and <b>{likeCount.toLocaleString()} others</b></span>
      </div>

      {/* Caption & Hashtags */}
      <div className="ig-caption-block">
        <p className="cap">
          <b>{handle}</b> {c.body}
        </p>
        {c.hashtags?.length > 0 && <p className="tags">{tagLine(c.hashtags)}</p>}
      </div>

      <div className="ig-footer-meta">
        <small className="muted">View all 42 comments</small>
        <small className="ig-time">2 HOURS AGO · SEE TRANSLATION</small>
      </div>
    </div>
  )
}

// ── LinkedIn Mockup ───────────────────────────────────────────────────
export function LinkedInPreview({ c, brand, visualUrl, visualMode, liked, toggleLike, likeCount }) {
  const domain = `${(brand || 'brand').toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
  return (
    <div className="post li-ad-card">
      {/* LI Header */}
      <div className="li-head">
        <div className="li-logo">{(brand || 'C').slice(0, 2).toUpperCase()}</div>
        <div className="li-info">
          <div className="li-title-row">
            <b>{brand}</b>
            <span className="li-dot">•</span>
            <span className="li-follow">+ Follow</span>
          </div>
          <small className="muted">14,280 followers · Promoted</small>
        </div>
        <span className="li-more">•••</span>
      </div>

      {/* Copy Text */}
      <p className="li-body">{c.body}</p>
      {c.hashtags?.length > 0 && <p className="tags">{tagLine(c.hashtags)}</p>}

      {/* Sponsored Link Card */}
      <div className="li-media-card">
        {visualMode === 'typography' ? (
          <div className="typo-creative li-ratio">
            <h4>{c.headline || brand}</h4>
          </div>
        ) : (
          <img src={visualUrl} alt={c.headline || brand} className="ad-creative-img li-ratio" loading="lazy" />
        )}
        <div className="li-card-bottom">
          <div className="li-card-texts">
            <span className="li-card-domain">{domain.toUpperCase()}</span>
            <h5 className="li-card-headline">{c.headline || brand}</h5>
          </div>
          <button className="btn small li-cta-btn">{c.call_to_action || 'Learn more'}</button>
        </div>
      </div>

      {/* Engagement Counter */}
      <div className="li-reactions-row">
        <span>👍 💡 ❤️ <b>{(likeCount / 2).toFixed(0)}</b></span>
        <span className="muted">36 comments · 12 reposts</span>
      </div>

      {/* Interaction Buttons */}
      <div className="li-actions-grid">
        <button className={`li-act-btn ${liked ? 'active' : ''}`} onClick={toggleLike}>
          <span>{liked ? '❤️ Liked' : '👍 Like'}</span>
        </button>
        <button className="li-act-btn"><span>💬 Comment</span></button>
        <button className="li-act-btn"><span>🔄 Repost</span></button>
        <button className="li-act-btn"><span>✈️ Send</span></button>
      </div>
    </div>
  )
}

// ── Twitter / X Mockup ────────────────────────────────────────────────
export function TwitterPreview({ c, brand, visualUrl, visualMode, liked, toggleLike, likeCount }) {
  const handle = (brand || 'brand').toLowerCase().replace(/[^a-z0-9]/g, '')
  const text = `${c.body} ${tagLine(c.hashtags)}`.trim()
  return (
    <div className="post tw-ad-card">
      <div className="tw-header">
        <Avatar name={brand} />
        <div className="tw-user-meta">
          <div className="tw-names">
            <b>{brand}</b>
            <VerifiedBadge />
            <span className="muted">@{handle}</span>
            <span className="muted">· 1h</span>
          </div>
          <small className="tw-promoted-pill">Promoted ↗</small>
        </div>
      </div>

      <p className="tw-body-text">{c.body}</p>
      {c.hashtags?.length > 0 && <p className="tags">{tagLine(c.hashtags)}</p>}

      {/* Twitter Media Card */}
      <div className="tw-media-box">
        {visualMode === 'typography' ? (
          <div className="typo-creative tw-ratio">
            <h4>{c.headline || brand}</h4>
          </div>
        ) : (
          <img src={visualUrl} alt={c.headline || brand} className="ad-creative-img tw-ratio" loading="lazy" />
        )}
        <div className="tw-media-foot">
          <small className="muted">{handle}.com</small>
          <b>{c.headline || brand}</b>
        </div>
      </div>

      {/* Twitter Action Row */}
      <div className="tw-metrics-row">
        <span className="tw-stat">💬 28</span>
        <span className="tw-stat">🔄 94</span>
        <button className={`tw-like-btn ${liked ? 'liked' : ''}`} onClick={toggleLike}>
          {liked ? '❤️' : '🤍'} <b>{(likeCount + 120).toLocaleString()}</b>
        </button>
        <span className="tw-stat">📊 24.6K</span>
        <span className="tw-stat">🔖</span>
      </div>
    </div>
  )
}

// ── Facebook Mockup ───────────────────────────────────────────────────
export function FacebookPreview({ c, brand, visualUrl, visualMode, liked, toggleLike, likeCount }) {
  const domain = `${(brand || 'brand').toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
  return (
    <div className="post fb-ad-card">
      <div className="fb-head">
        <Avatar name={brand} />
        <div>
          <b>{brand}</b>
          <small className="fb-sponsored-row">Sponsored · 🌐</small>
        </div>
        <span className="fb-more">•••</span>
      </div>

      <p className="fb-body">{c.body}</p>
      {c.hashtags?.length > 0 && <p className="tags">{tagLine(c.hashtags)}</p>}

      <div className="fb-media-card">
        {visualMode === 'typography' ? (
          <div className="typo-creative fb-ratio">
            <h4>{c.headline || brand}</h4>
          </div>
        ) : (
          <img src={visualUrl} alt={c.headline || brand} className="ad-creative-img fb-ratio" loading="lazy" />
        )}
        <div className="fb-link-bar">
          <div className="fb-link-info">
            <span className="fb-domain">{domain.toUpperCase()}</span>
            <h5 className="fb-headline">{c.headline || brand}</h5>
          </div>
          <button className="btn small fb-cta-btn">{c.call_to_action || 'Learn More'}</button>
        </div>
      </div>

      <div className="fb-reactions-bar">
        <span>👍 ❤️ 😮 <b>{(likeCount * 1.5).toFixed(0)}</b></span>
        <span className="muted">84 Comments · 29 Shares</span>
      </div>

      <div className="fb-actions-row">
        <button className={`fb-act-btn ${liked ? 'active' : ''}`} onClick={toggleLike}>
          {liked ? '❤️ Loved' : '👍 Like'}
        </button>
        <button className="fb-act-btn">💬 Comment</button>
        <button className="fb-act-btn">↪ Share</button>
      </div>
    </div>
  )
}

const MAP = { instagram: InstagramPreview, linkedin: LinkedInPreview, twitter: TwitterPreview, facebook: FacebookPreview }

// ── Master Preview Component with Toolbar ──────────────────────────────
export default function Preview({ platform, content, brand, product = '', audience = '' }) {
  const [seed, setSeed] = useState(42)
  const [visualMode, setVisualMode] = useState('curated') // 'ai' | 'curated' | 'typography'
  const [liked, setLiked] = useState(false)
  const [copied, setCopied] = useState(false)

  const curatedUrl = useMemo(() => getCuratedImage(product, brand), [product, brand])

  const aiUrl = useMemo(() => {
    const promptText = `${product || brand} high-end commercial product advertisement, modern studio lighting, 4k ultra-realistic`
    return `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=800&height=800&nologo=true&seed=${seed}`
  }, [product, brand, seed])

  const activeVisual = visualMode === 'ai' ? aiUrl : curatedUrl

  const handleCopy = () => {
    const text = `${content?.headline ? content.headline + '\n\n' : ''}${content?.body || ''}\n\n${tagLine(content?.hashtags)}`
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const C = MAP[platform] || InstagramPreview

  return (
    <div className="preview-engine-wrapper">
      {/* Mockup Toolbar */}
      <div className="mockup-toolbar">
        <div className="mockup-modes">
          <button
            className={`pill-btn ${visualMode === 'curated' ? 'active' : ''}`}
            onClick={() => setVisualMode('curated')}
            title="High-definition curated commercial photography"
          >
            📸 Studio Photo
          </button>
          <button
            className={`pill-btn ${visualMode === 'ai' ? 'active' : ''}`}
            onClick={() => setVisualMode('ai')}
            title="Generate real-time AI visual via Pollinations"
          >
            ✨ AI Generated
          </button>
          <button
            className={`pill-btn ${visualMode === 'typography' ? 'active' : ''}`}
            onClick={() => setVisualMode('typography')}
            title="Minimalist high-contrast typographical poster"
          >
            🎨 Minimal Graphic
          </button>
        </div>

        <div className="mockup-quick-actions">
          {visualMode === 'ai' && (
            <button
              className="action-icon-btn"
              onClick={() => setSeed((s) => s + Math.floor(Math.random() * 50) + 1)}
              title="Generate a new AI image variant"
            >
              🔄 Re-roll AI
            </button>
          )}
          <button className="action-icon-btn copy-btn" onClick={handleCopy} title="Copy formatted post copy">
            {copied ? '✓ Copied!' : '📋 Copy Text'}
          </button>
          <a
            href={activeVisual}
            target="_blank"
            rel="noreferrer"
            className="action-icon-btn"
            title="Open high-resolution creative"
          >
            ↗ Creative
          </a>
        </div>
      </div>

      {/* Render the Active Platform Ad Card */}
      <div className="mockup-stage">
        <C
          c={content}
          brand={brand}
          visualUrl={activeVisual}
          visualMode={visualMode}
          liked={liked}
          toggleLike={() => setLiked((l) => !l)}
          likeCount={1248 + (liked ? 1 : 0)}
        />
      </div>
    </div>
  )
}
