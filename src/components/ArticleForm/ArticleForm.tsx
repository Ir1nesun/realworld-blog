import { useState, useEffect } from 'react';
import './articleForm.css';

interface ArticleFormProps {
  onSubmit: (data: { title: string; description: string; body: string; tagList: string[] }) => void;
  initialData?: {
    title: string;
    description: string;
    body: string;
    tagList?: string[];
  };
  buttonText?: string;
  formTitle?: string;
}

const ArticleForm = ({
  onSubmit,
  initialData,
  buttonText = 'Send',
  formTitle = 'Edit article',
}: ArticleFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tagList, setTagList] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setBody(initialData.body);
      setTagList(initialData.tagList || []);
    }
  }, [initialData]);

  const handleTagChange = (index: number, newValue: string) => {
    const newTags = [...tagList];
    newTags[index] = newValue;
    setTagList(newTags);
  };

  const handleDeleteTag = (index: number) => {
    setTagList(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddTag = () => {
    setTagList(prev => [...prev, '']);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !body.trim()) {
      alert('Please fill in all the required fields!');
      return;
    }

    onSubmit({ title, description, body, tagList });
  };

  return (
    <div className="article-form-container">
      <h1 className="article-form-title">{formTitle}</h1>

      <form className="article-form" onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Article title"
          />
        </div>

        <div>
          <label>Short description</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What's this article about?"
          />
        </div>

        <div>
          <label>Text</label>
          <textarea
            rows={10}
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Write your article (in markdown)"
          />
        </div>

        <div>
          <label>Tags</label>
          {tagList.map((tag, index) => (
            <div className="tag-row" key={index}>
              <input
                type="text"
                value={tag}
                className="tag-input"
                onChange={e => handleTagChange(index, e.target.value)}
                placeholder="Enter tag"
              />
              <div className="tag-actions">
                <button
                  type="button"
                  className="delete-tag-button"
                  onClick={() => handleDeleteTag(index)}
                >
                  Delete
                </button>

                {index === tagList.length - 1 && (
                  <button type="button" className="add-tag-button" onClick={handleAddTag}>
                    Add tag
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-button">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;
