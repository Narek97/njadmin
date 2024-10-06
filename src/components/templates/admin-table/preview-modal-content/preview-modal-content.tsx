import React, { FC } from 'react';
import './preview-modal-content.scss';
import { ObjectKeysType } from '@/utils/ts/types/global.types';

interface IPreviewModalContent {
  previewData: ObjectKeysType;
  onHandleEditPreviewRow: () => void;
}

const PreviewModalContent: FC<IPreviewModalContent> = ({ previewData, onHandleEditPreviewRow }) => {
  return (
    <div className={'preview-modal-content'}>
      <ul>
        {Object.entries(previewData).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value !== null ? value.toString() : 'N/A'}
          </li>
        ))}
      </ul>
      <button onClick={onHandleEditPreviewRow}>Edit</button>
    </div>
  );
};

export default PreviewModalContent;
