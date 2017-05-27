import React, { Component, PropTypes } from 'react';
import RichTextEditor from 'react-rte';
class Wysiwyg extends Component {

  static propTypes = {
    onBlur: PropTypes.func,
    input: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.input.value === '' ? RichTextEditor.createEmptyValue() : RichTextEditor.createValueFromString(this.props.input.value, 'html'),
      typing: false,
      typingTimeOut: 0,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value === '') {
      // eslint-disable-next-line react/no-set-state
      this.setState({
        ...this.state,
        value: RichTextEditor.createEmptyValue(),
      });
    }
  }

  onChange(value) {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
    // 0.25sec timeout for sending text value to redux state for performance
    // eslint-disable-next-line react/no-set-state
    this.setState({
      value,
      typing: false,
      typingTimeout: setTimeout(() => {
        const isEmpty = !value.getEditorState().getCurrentContent().hasText();
        const val = isEmpty ? '' : value.toString('html');
        this.props.input.onChange(val);
      }, 250),
    });
  }

  render() {
    const { value } = this.state;
    const { onBlur } = this.props.input;
    const toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
      INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' },
      ],
      BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' },
      ],
    };
    // editorStyle={{background: 'black', height: '300px'}} in next version to allow resizing on the fly
    return (
      <RichTextEditor
        value={value}
        onChange={this.onChange}
        onBlur={onBlur}
        toolbarConfig={toolbarConfig}
        placeholder="What do you want to say?"
      />
    );
  }
}

export default Wysiwyg;
