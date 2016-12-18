import { Link } from 'react-router';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
	onClickDelete: (payload) =>
	  dispatch({ type: 'DELETE_ARTICLE', payload })
});

const ArticleActions = ({onClickDelete,article, canModify}) => {
	const del = () => {
		onClickDelete(agent.Articles.del(article.slug))
	};
	
	if (canModify) {
		return (
			<span>
			
			
				<Link
					to={`/editor/${article.slug}`}
					className="btn btn-outline-secondary btn-sm"
				>
				<i className="ion-edit"></i> Edit Article
				</Link>
				
				<button className="btn btn-outline-danger btn-sm" onClick={del}>
					<i className="ion-trash-a"></i> Delete Article
				</button>
				
				
			</span>
			
		);
	}
	//if can't modify
	 return (
    <span>
    </span>
  );
	
	
}

export default connect(() => ({}), mapDispatchToProps)(ArticleActions);