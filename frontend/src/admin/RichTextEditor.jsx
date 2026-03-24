import { useState } from 'react';
import mammoth from 'mammoth';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table';
import { TextStyle, Color } from '@tiptap/extension-text-style';

const TEXT_COLORS = [
  { value: '#000000', label: 'Schwarz' },
  { value: '#1a1a2e', label: 'Dunkelblau' },
  { value: '#1565c0', label: 'Blau' },
  { value: '#00838f', label: 'Türkis' },
  { value: '#2e7d32', label: 'Grün' },
  { value: '#e65100', label: 'Orange' },
  { value: '#c62828', label: 'Rot' },
  { value: '#6a1b9a', label: 'Lila' },
  { value: '#880e4f', label: 'Magenta' },
  { value: '#555555', label: 'Grau' },
];

// Extend TableCell and TableHeader to support background-color
const ColoredTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: el => el.style.backgroundColor || null,
        renderHTML: attrs => attrs.backgroundColor
          ? { style: `background-color: ${attrs.backgroundColor}` }
          : {}
      }
    };
  }
});

const ColoredTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: el => el.style.backgroundColor || null,
        renderHTML: attrs => attrs.backgroundColor
          ? { style: `background-color: ${attrs.backgroundColor}` }
          : {}
      }
    };
  }
});

const CELL_COLORS = [
  { value: '#dbeafe', label: 'Blau' },
  { value: '#dcfce7', label: 'Grün' },
  { value: '#fef9c3', label: 'Gelb' },
  { value: '#ffedd5', label: 'Orange' },
  { value: '#fee2e2', label: 'Rot' },
  { value: '#ede9fe', label: 'Lila' },
  { value: '#cffafe', label: 'Türkis' },
  { value: '#fce7f3', label: 'Rosa' },
  { value: '#f3f4f6', label: 'Grau' },
  { value: '#ffffff', label: 'Weiß' },
];
import { useAuth } from './AuthContext';
import './RichTextEditor.css';

// Extend Image to support alignment via class attribute
const AlignableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: 'img-center',
        parseHTML: el => el.getAttribute('class'),
        renderHTML: attrs => ({ class: attrs.class })
      }
    };
  }
});

const ALIGNMENTS = [
  { value: 'img-left',  label: '◧ Links',       title: 'Links ausrichten (Text rechts)' },
  { value: 'img-center',label: '▣ Mitte',        title: 'Zentriert' },
  { value: 'img-right', label: '◨ Rechts',       title: 'Rechts ausrichten (Text links)' },
  { value: 'img-full',  label: '⬛ Volle Breite', title: 'Volle Breite' }
];

function ToolbarButton({ onClick, active, title, children }) {
  return (
    <button type="button" className={`rte-btn ${active ? 'rte-btn--active' : ''}`}
      onClick={onClick} title={title}>
      {children}
    </button>
  );
}

export default function RichTextEditor({ value, onChange }) {
  const { token } = useAuth();
  const [showImagePanel, setShowImagePanel] = useState(false);
  const [imageAlign, setImageAlign] = useState('img-center');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('https://');
  const [uploading, setUploading] = useState(false);
  const [importing, setImporting] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      AlignableImage.configure({ inline: false }),
      Link.configure({ openOnClick: false }),
      TextStyle,
      Color,
      Table.configure({ resizable: false }),
      TableRow,
      ColoredTableCell,
      ColoredTableHeader
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML())
  });

  if (!editor) return null;

  async function handleImageUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg,.jpeg,.png';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setUploading(true);
      const formData = new FormData();
      formData.append('image', file);
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` },
          body: formData
        });
        const data = await res.json();
        if (data.url) {
          editor.chain().focus().setImage({ src: data.url, class: imageAlign }).run();
          setShowImagePanel(false);
        } else {
          alert(data.error || 'Upload fehlgeschlagen.');
        }
      } catch {
        alert('Bild konnte nicht hochgeladen werden.');
      } finally {
        setUploading(false);
      }
    };
    input.click();
  }

  function applyLink() {
    if (linkUrl && linkUrl !== 'https://') {
      editor.chain().focus().setLink({ href: linkUrl }).run();
    }
    setShowLinkInput(false);
    setLinkUrl('https://');
  }

  function removeLink() {
    editor.chain().focus().unsetLink().run();
    setShowLinkInput(false);
  }

  async function handleWordImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.docx';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setImporting(true);
      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        editor.commands.setContent(result.value);
        onChange(result.value);
      } catch {
        alert('Word-Datei konnte nicht importiert werden.');
      } finally {
        setImporting(false);
      }
    };
    input.click();
  }

  return (
    <div className="rte">
      <div className="rte-toolbar">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')} title="Fett"><strong>B</strong></ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')} title="Kursiv"><em>I</em></ToolbarButton>
        <div className="rte-divider" />
        {/* Text color swatches */}
        <span className="rte-panel__label" style={{fontSize:'0.78rem',color:'#666'}}>A:</span>
        {TEXT_COLORS.map(c => (
          <button key={c.value} type="button" className="rte-cell-color"
            style={{ backgroundColor: c.value }}
            title={c.label}
            onClick={() => editor.chain().focus().setColor(c.value).run()}
          />
        ))}
        <button type="button" className="rte-cell-color rte-cell-color--clear"
          title="Farbe entfernen"
          onClick={() => editor.chain().focus().unsetColor().run()}>✕</button>
        <div className="rte-divider" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })} title="Überschrift H2">H2</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })} title="Überschrift H3">H3</ToolbarButton>
        <div className="rte-divider" />
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')} title="Aufzählungsliste">≡</ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')} title="Nummerierte Liste">1.</ToolbarButton>
        <div className="rte-divider" />
        <ToolbarButton onClick={() => setShowLinkInput(v => !v)}
          active={editor.isActive('link') || showLinkInput} title="Link einfügen">🔗</ToolbarButton>
        <ToolbarButton onClick={() => setShowImagePanel(v => !v)}
          active={showImagePanel} title="Bild hochladen (.jpg / .png)">🖼</ToolbarButton>
        <div className="rte-divider" />
        <ToolbarButton
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          active={editor.isActive('table')} title="Tabelle einfügen">⊞ Tabelle</ToolbarButton>
        <div className="rte-divider" />
        <ToolbarButton onClick={handleWordImport} title="Word-Datei importieren (.docx)">
          {importing ? '…' : '📎 Word'}
        </ToolbarButton>
      </div>

      {/* Table controls — only shown when cursor is inside a table */}
      {editor.isActive('table') && (
        <div className="rte-panel rte-panel--table">
          <span className="rte-panel__label">Zeilen/Spalten:</span>
          <button type="button" className="rte-panel__btn"
            onClick={() => editor.chain().focus().addRowAfter().run()} title="Zeile darunter einfügen">
            + Zeile
          </button>
          <button type="button" className="rte-panel__btn"
            onClick={() => editor.chain().focus().deleteRow().run()} title="Zeile löschen">
            − Zeile
          </button>
          <button type="button" className="rte-panel__btn"
            onClick={() => editor.chain().focus().addColumnAfter().run()} title="Spalte rechts einfügen">
            + Spalte
          </button>
          <button type="button" className="rte-panel__btn"
            onClick={() => editor.chain().focus().deleteColumn().run()} title="Spalte löschen">
            − Spalte
          </button>
          <button type="button" className="rte-panel__btn rte-panel__btn--remove"
            onClick={() => editor.chain().focus().deleteTable().run()} title="Tabelle löschen">
            ⊠ Löschen
          </button>
          <div className="rte-divider" />
          <span className="rte-panel__label">Zellenfarbe:</span>
          {CELL_COLORS.map(c => (
            <button
              key={c.value}
              type="button"
              className="rte-cell-color"
              style={{ backgroundColor: c.value }}
              title={c.label}
              onClick={() => editor.chain().focus().setCellAttribute('backgroundColor', c.value).run()}
            />
          ))}
          <button
            type="button"
            className="rte-cell-color rte-cell-color--clear"
            title="Keine Farbe"
            onClick={() => editor.chain().focus().setCellAttribute('backgroundColor', null).run()}
          >✕</button>
        </div>
      )}

      {/* Link input bar */}
      {showLinkInput && (
        <div className="rte-panel">
          <span className="rte-panel__label">Link-URL:</span>
          <input
            className="rte-panel__input"
            value={linkUrl}
            onChange={e => setLinkUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && applyLink()}
            autoFocus
            placeholder="https://..."
          />
          <button type="button" className="rte-panel__btn rte-panel__btn--ok" onClick={applyLink}>
            Einfügen
          </button>
          {editor.isActive('link') && (
            <button type="button" className="rte-panel__btn rte-panel__btn--remove" onClick={removeLink}>
              Entfernen
            </button>
          )}
          <button type="button" className="rte-panel__btn" onClick={() => setShowLinkInput(false)}>
            ✕
          </button>
        </div>
      )}

      {/* Image panel with alignment options */}
      {showImagePanel && (
        <div className="rte-panel rte-panel--image">
          <span className="rte-panel__label">Position:</span>
          {ALIGNMENTS.map(a => (
            <button
              key={a.value}
              type="button"
              className={`rte-panel__btn ${imageAlign === a.value ? 'rte-panel__btn--ok' : ''}`}
              onClick={() => setImageAlign(a.value)}
              title={a.title}
            >
              {a.label}
            </button>
          ))}
          <div className="rte-divider" />
          <button
            type="button"
            className="rte-panel__btn rte-panel__btn--ok"
            onClick={handleImageUpload}
            disabled={uploading}
          >
            {uploading ? 'Wird hochgeladen…' : '📁 Datei auswählen (.jpg / .png)'}
          </button>
          <button type="button" className="rte-panel__btn" onClick={() => setShowImagePanel(false)}>
            ✕
          </button>
        </div>
      )}

      <EditorContent editor={editor} className="rte-content" />
    </div>
  );
}
