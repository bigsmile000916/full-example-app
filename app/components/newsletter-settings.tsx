import React from 'react';

const NewsletterSettings = () => {
  return (
    <div>
      <h2 className="text-lg mb-2">メール通知</h2>
      <label className="flex items-center">
        <input className="rounded mr-2" type="checkbox" />
        <span>お知らせ</span>
      </label>
    </div>
  );
};

export default NewsletterSettings;
