import React, { PropTypes } from 'react';
import { Chip } from 'material-ui';
import Dropzone from 'react-dropzone';

class DropzoneInput extends React.Component { // eslint-disable-line
  render() {
    console.log(this.props);
    return (
      <div style={{ textAlign: 'center' }}>
        <Dropzone
          name={this.props.input.name}
          onDrop={(filesToUpload) => this.props.input.onChange({ files: filesToUpload })}
          maxSize={5000000}
          multiple
          style={{
            border: '3px dotted #ccc',
            borderRadius: '20px',
            height: 85,
            position: 'relative',
            width: '80%',
            display: 'block',
            marginTop: 5,
            marginBottom: 15,
            marginLeft: 'auto',
            marginRight: 'auto',
            color: '#808080',
          }}
          rejectStyle={{ borderColor: 'red' }}
        >
          <br />Drop a file or click to select one<br />
          <i>Maximum size:  5 MB</i>
          <br />
        </Dropzone>
        { (this.props.input.value.files || this.props.currentFiles) &&
          <div>
            { this.props.currentFiles && this.props.currentFiles.map((f) => {
              console.log(f);
              return (
                <Chip
                  key={f.name}
                  style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 10 }}
                  onRequestDelete={() => console.log('delete!')}
                >
                  <a href={f._links.url} target="_blank"><b>{f.name}</b></a>
                </Chip>
              );
            }) }
            { this.props.input.value.files && this.props.input.value.files.map((f) => (
              <Chip
                key={f.name}
                style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 10 }}
              >
                <b>{ f.name }</b>
              </Chip>
            )) }
          </div>
        }
      </div>
    );
  }
}
DropzoneInput.propTypes = {
  input: PropTypes.object.isRequired,
  // deleteFile: PropTypes.func,
  currentFiles: PropTypes.array,
};

export default DropzoneInput;
