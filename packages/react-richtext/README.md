# @mittirorg/react-richtext

A rich text editor component for React.

## Installation

You can install the package via npm:

```bash
npm install @mittirorg/react-richtext
```

or via yarn:

```bash
yarn add @mittirorg/react-richtext
```

## Usage

Here’s a basic example of how to use the `RichTextEditor` component:

```tsx
import React, { useState, useRef } from 'react';
import RichTextEditor, {
  IEditorProps,
  IFetchSuggestions,
  IRenderSuggestions,
  IRenderHint,
  IHandleLinks,
  IHandleEntitiesCb,
  IEntityInfo,
} from '@mittirorg/react-richtext';

const InputBox = () => {
  // Initialize editor state
  const [editorState, setEditorState] = useState(null);
  const [isTriggerInserted, setTriggerInserted] = useState(false);
  const editorContainerRef = useRef(null);

  const fetchSuggestions: IFetchSuggestions = async (searchText, triggerKey) => {
    // Fetch suggestions based on searchText and triggerKey
    // Replace with actual suggestion fetching logic
    return {
      suggestions: [{ viewText: 'Suggestion 1' }, { viewText: 'Suggestion 2' }],
      showHint: true,
    };
  };

  const renderSuggestions: IRenderSuggestions = (
    position,
    suggestions,
    currentTriggerKey,
    onClose,
    handleAddEntity,
    hideSuggestions,
  ) => {
    // Render suggestions based on position, suggestions, currentTriggerKey, etc.
    // Replace with actual rendering logic
    return (
      <div
        style={{
          position: 'absolute',
          top: position.bottom,
          left: position.left,
        }}
      >
        {suggestions.map((suggestion, index) => (
          <div key={index} onClick={() => handleAddEntity(suggestion)}>
            {suggestion.viewText}
          </div>
        ))}
      </div>
    );
  };

  const renderHint: IRenderHint = (position, currentTriggerKey, onClose, hideSuggestions) => {
    // Render hint based on position, currentTriggerKey, etc.
    // Replace with actual rendering logic
    return (
      <div style={{ position: 'absolute', top: position.bottom, left: position.left }}>
        <div>Hint for {currentTriggerKey}</div>
      </div>
    );
  };

  const handleLinks: IHandleLinks = (type, data) => {
    // Handle links based on type and data
    // Replace with actual link handling logic
    console.log('Link handling:', type, data);
  };

  const handleEntitiesCb: IHandleEntitiesCb = (entityData, triggerKey) => {
    // Handle entities based on entityData and triggerKey
    // Replace with actual entity handling logic
    console.log('Entity handling:', entityData, triggerKey);
  };

  const editorProps: IEditorProps = {
    isTriggerInserted,
    possibleTriggerKeys: ['@', '#'],
    placeholder: 'Write something...',
    editorContainerRef,
    initialState: editorState,
    setEditorState,
    fetchSuggestions,
    renderSuggestions,
    renderHint,
    handleLinks,
    handleEntitiesCb,
    resetIsTriggerInserted: () => setTriggerInserted(false),
    onFocusCb: () => console.log('Editor focused'),
  };

  return (
    <div>
      <RichTextEditor {...editorProps} />
    </div>
  );
};

export default InputBox;
```

## Props

| Name | Type | Description |
| --- | --- | --- |
| isTriggerInserted? | boolean | Indicates if a trigger is inserted. |
| possibleTriggerKeys? | Array<string> | Array of possible trigger keys. |
| placeholder | string | Placeholder text for the editor. |
| editorContainerRef | React.MutableRefObject<HTMLDivElement> | Ref to the editor container. |
| children | React.ReactNode | Child components. |
| fontStyleClass? | string | CSS class for editor font style. |
| initialState? | IEditorState | Initial state of the editor. |
| externalTriggerKey? | string | External trigger key. |
| setEditorState | (editorState: EditorState) => void | Function to set editor state. |
| fetchSuggestions? | IFetchSuggestions | Function to fetch suggestions. |
| renderSuggestions? | IRenderSuggestions | Function to render suggestions. |
| renderHint? | IRenderHint | Function to render hints. |
| handleLinks? | IHandleLinks | Function to handle links. |
| handleEntitiesCb? | IHandleEntitiesCb | Function to handle entities. |
| resetIsTriggerInserted? | () => void | Function to reset trigger insertion. |
| onFocusCb? | () => void | Callback on editor focus. |

## Prop Definition

| Name | Type | Description |
| --- | --- | --- |
| IFetchSuggestions | (searchText: string, triggerKey: string) => Promise<{ suggestions: Array<IEntityInfo>, showHint: boolean }> | Function to fetch suggestions based on searchText and triggerKey. |
| IRenderSuggestions | (position: { bottom: number; top: number; left: number; }, suggestions: Array<IEntityInfo>, currentTriggerKey: string, onClose: () => void, handleAddEntity: (entityInfoData: IEntityInfo) => void, hideSuggestions: () => void) => JSX.Element | Function to render suggestions with specified position, suggestions, current trigger key, and callbacks for actions. |
| IRenderHint | (position: { bottom: number; top: number; left: number; }, currentTriggerKey: string, onClose: () => void, hideSuggestions: () => void) => JSX.Element | Function to render a hint with specified position, current trigger key, and callbacks for actions. |
| IHandleLinks | (type: 'add' | 'delete', data: { meta: IEntityInfo, offsetKey: string }) => void | Function to handle links based on the type of action ('add' or 'delete') and the provided data. |
| IHandleEntitiesCb | (entityData: IEntityInfo, triggerKey: string) => void | Function to handle entity data and trigger key. |

## Contributing

We welcome contributions! To contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.