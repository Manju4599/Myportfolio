import { useState, useRef, useEffect } from 'react';
import { askAssistant } from '../assistant/portfolioAssistant';
import './Assistant.css';

const SUGGESTIONS = [
  'What projects has Manjunath built?',
  'Show me his machine learning work',
  'What is the Hospital Alert system?',
  'How can I contact him?',
  'What is DataPure?',
];

function renderMarkdown(text) {
  // Simple markdown: **bold**, bullet lines
  return text
    .split('\n')
    .map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      if (line.startsWith('• ')) {
        return `<div class="assistant-msg__bullet">${bold.slice(2)}</div>`;
      }
      return `<p>${bold}</p>`;
    })
    .join('');
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi! I'm a portfolio assistant for Manjunath R. Ask me about his projects, skills, or experience.",
    },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text) => {
    const question = (text || input).trim();
    if (!question) return;

    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    setInput('');
    setThinking(true);

    // Simulate a tiny delay to feel more natural (deterministic under the hood)
    setTimeout(() => {
      const answer = askAssistant(question);
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
      setThinking(false);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open]);

  return (
    <>
      {/* Toggle button */}
      <button
        className={`assistant-toggle${open ? ' assistant-toggle--open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close portfolio assistant' : 'Open portfolio assistant'}
        aria-expanded={open}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
        <span className="sr-only">{open ? 'Close assistant' : 'Ask about portfolio'}</span>
      </button>

      {/* Chat panel */}
      <div className={`assistant-panel${open ? ' assistant-panel--open' : ''}`} role="dialog" aria-modal="true" aria-label="Portfolio assistant">
        {/* Header */}
        <div className="assistant-header">
          <div className="assistant-header__info">
            <div className="assistant-header__avatar" aria-hidden="true">MR</div>
            <div>
              <div className="assistant-header__name">Portfolio Assistant</div>
              <div className="assistant-header__note font-mono">Answers from portfolio data only</div>
            </div>
          </div>
          <button className="assistant-close" onClick={() => setOpen(false)} aria-label="Close assistant">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="assistant-messages" aria-live="polite" aria-label="Conversation">
          {messages.map((msg, index) => (
            <div key={index} className={`assistant-msg assistant-msg--${msg.role}`}>
              <div
                className="assistant-msg__bubble"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
              />
            </div>
          ))}
          {thinking && (
            <div className="assistant-msg assistant-msg--assistant">
              <div className="assistant-msg__bubble assistant-msg__thinking" aria-label="Thinking">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 2 && (
          <div className="assistant-suggestions" aria-label="Suggested questions">
            {SUGGESTIONS.slice(0, 3).map((s) => (
              <button key={s} className="assistant-suggestion" onClick={() => handleSend(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="assistant-input-row">
          <input
            ref={inputRef}
            type="text"
            className="assistant-input"
            placeholder="Ask about projects, skills, experience..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Your question"
            disabled={thinking}
          />
          <button
            className="assistant-send"
            onClick={() => handleSend()}
            disabled={!input.trim() || thinking}
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
