import React from 'react';
import { Chip } from 'material-ui';
import Dropzone from 'react-dropzone';

class DropzoneInput extends React.Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Dropzone
          name={this.props.input.name}
          onDrop={(filesToUpload) => this.props.input.onChange({ files: filesToUpload })}
          maxSize={5000000}
          multiple={true}
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
        { this.props.input.value.files &&
          <div>
            { this.props.input.value.files.map((f) => (
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
};

export default DropzoneInput;
