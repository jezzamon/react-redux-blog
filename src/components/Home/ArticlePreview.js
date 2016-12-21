import React from 'react';
import { Link } from 'react-router';
import agent from '../../agent';
import {connect} from 'react-redux';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
	favorite: slug =>
	  dispatch({ type: 'ARTICLE_FAVORITED,', payload: agent.Articles.favorite(slug)}),
	unfavorite: slug =>
	  dispatch({ type: 'ARTICLE_UNFAVORITED', payload: agent.Articles.unfavorite(slug)})
});

const ArticlePreview = (props) => { //was props
  const article = props.article;
	const favoriteButtonClass = article.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;
	
	const handleClick = ev => {
		ev.preventDefault();
		if (article.favorited) {
			this.props.unfavorite(article.slug);
		} else {
			this.props.favorite(article.slug);
		}
	};

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`@${article.author.username}`}>
					<img alt="author" src={article.author.image} />
        </Link>
        
        <div className="info">
          <Link className="author" to={`@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button
            className="btn btn-sm btn-outline-primary">
            <i className="ion-heart" /> {article.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            article.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              );
            })
          }
        </ul>
      </Link>
    </div>
  );
};

export default ArticlePreview;