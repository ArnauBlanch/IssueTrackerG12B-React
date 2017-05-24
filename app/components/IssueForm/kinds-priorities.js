import React from 'react';
import bugIcon from '!file-loader?name=[name].[ext]!../../images/issue_kinds/bug.svg';
import taskIcon from '!file-loader?name=[name].[ext]!../../images/issue_kinds/task.svg';
import enhancementIcon from '!file-loader?name=[name].[ext]!../../images/issue_kinds/improvement.svg';
import proposalIcon from '!file-loader?name=[name].[ext]!../../images/issue_kinds/suggestion.svg';
import blockerIcon from '!file-loader?name=[name].[ext]!../../images/issue_priorities/blocker.svg';
import criticalIcon from '!file-loader?name=[name].[ext]!../../images/issue_priorities/critical.svg';
import majorIcon from '!file-loader?name=[name].[ext]!../../images/issue_priorities/major.svg';
import minorIcon from '!file-loader?name=[name].[ext]!../../images/issue_priorities/minor.svg';
import trivialIcon from '!file-loader?name=[name].[ext]!../../images/issue_priorities/trivial.svg';

const textIcon = (text, src) => (
  <span><img alt={text} src={src} height="16px" />&nbsp;&nbsp;&nbsp;{text}</span>
);

export const kinds = [
  {
    name: 'bug',
    icon: textIcon('Bug', bugIcon),
  },
  {
    name: 'task',
    icon: textIcon('Task', taskIcon),
  },
  {
    name: 'enhancement',
    icon: textIcon('Enhancement', enhancementIcon),
  },
  {
    name: 'proposal',
    icon: textIcon('Proposal', proposalIcon),
  },
];

export const priorities = [
  {
    name: 'trivial',
    icon: textIcon('Trivial', trivialIcon),
  },
  {
    name: 'minor',
    icon: textIcon('Minor', minorIcon),
  },
  {
    name: 'major',
    icon: textIcon('Major', majorIcon),
  },
  {
    name: 'critical',
    icon: textIcon('Critical', criticalIcon),
  },
  {
    name: 'blocker',
    icon: textIcon('Blocker', blockerIcon),
  },
];

export const users = [
  {
    id: 1,
    name: 'Arnau Blanch Cortès',
    nickname: 'ArnauBlanch',
    _links: {
      image: {
        href: 'https://www.fillmurray.com/30/30',
      },
    },
  },
  {
    id: 2,
    name: 'Iván de Mingo Guerrero',
    nickname: 'deMingo7',
    _links: {
      image: {
        href: 'https://www.fillmurray.com/20/20',
      },
    },
  },
];
