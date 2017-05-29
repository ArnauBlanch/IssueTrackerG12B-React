/**
*
* IssueDetailsMain
*
*/

import React, { PropTypes } from 'react';
import { CardHeader, Chip } from 'material-ui';
import { FormattedRelative } from 'react-intl';
import { blue100 as blue } from 'material-ui/styles/colors';

class IssueDetailsMain extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const issue = this.props.issue;

    return (
      <div>
        <h5 style={{ width: '100%', marginTop: 0 }}>{issue.title}</h5>

        <CardHeader
          title={<span>
            <b>{issue._links.creator.name}</b>
            &nbsp;&nbsp;&nbsp;
            <i style={{ color: '#888', fontWeight: 300, fontSize: 14 }}>
              {issue._links.creator.nickname}
            </i>
          </span>}
          subtitle={
            <span>
              <FormattedRelative value={issue.created_at} />
              { issue.created_at !== issue.updated_at && <span>&nbsp;&nbsp;-&nbsp;&nbsp;<i>edited <FormattedRelative value={issue.updated_at} /></i></span>}
            </span>
          }
          avatar={issue._links.creator.image.href}
        />

        {
          issue.description ?
            <div style={{ marginLeft: '16px' }} dangerouslySetInnerHTML={{ __html: issue.description }} /> // eslint-disable-line
          : <i style={{ marginLeft: '16px' }}>No description provided.</i>
        }
        { issue._embedded.attached_files &&
          <div style={{ textAlign: 'left' }}>
            <h6>Attached files</h6>
            { issue._embedded.attached_files.map((f) => (
              <Chip
                key={f.name}
                style={{ marginTop: 10 }}
                backgroundColor={blue}
                onRequestDelete={() => console.log('delete!')}
              >
                <a href={f._links.url} target="_blank"><b>{f.name}</b></a>
              </Chip>
            ))
            }
          </div>
        }
      </div>
    );
  }
}

IssueDetailsMain.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default IssueDetailsMain;
