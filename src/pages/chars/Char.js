import React, { Component } from 'react';
import './Char.scss';

import classNames from 'classnames';

import { handbookDict } from '../../data/original/handbook_info_table.json';
// import infos from '../../data/original/character_table.json';
import simpleInfos from '../../data/char/simples.json';
import { imageMaps } from '../../data/char/images';
import { Layout } from '../../components';

export default class Char extends Component {

  static defaultProps = {

  };

  static getDerivedStateFromProps(nextProps) {
    const { match } = nextProps;
    const id = match.params.id;
    const story = handbookDict[id];
    // const info = infos[id];
    const simpleInfo = simpleInfos.filter(si => si.id === id)[0];
    const image = imageMaps[id];

    // scroll to top
    window.scrollTo(0, 0);

    return {
      id,
      story,
      // info,
      simpleInfo,
      image
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  dangerP(text = '', index = -1) {
    const dummy = text.replace(/\n/ig, '<br/>');
    return <p key={index} dangerouslySetInnerHTML={{__html: dummy}} />;
  }

  renderStory(story) {
    const { storyTextAudio } = story;
    return (
      <div className="char-story">
        {storyTextAudio.map((sta, index) => {
          const { storyTitle, stories = [] } = sta;
          return (
            <div className="char-story-item" key={index}>
              <h2 className="char-story-title">{storyTitle}</h2>
              <div className="char-story-content">
                {stories.map((s, index) => this.dangerP(s.storyText, index))}
              </div>
            </div>
          )
        })}
      </div>
    );
  }

  render() {
    const {
      className,
    } = this.props;

    const { story, simpleInfo, image } = this.state;
    const clazz = classNames('char-detail', className);
    const imageHeight = window.innerHeight - 84;

    return (
      <Layout className={clazz}>
        <Layout.Sider width={600}>
          <h1 className="char-name">{simpleInfo.name}</h1>
          {this.renderStory(story)}
        </Layout.Sider>
        <Layout.Content>
          <div className="char-image">
            {image && (
              <img height={imageHeight} src={image} alt="" />
            )}
          </div>
        </Layout.Content>
      </Layout>
    );
  }
}
