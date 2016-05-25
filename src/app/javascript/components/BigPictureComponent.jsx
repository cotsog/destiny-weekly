import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

class BigPictureComponent extends React.Component {
	icon() {
		if(this.props.icon){
			return <img src={this.props.icon} />;
		}
	}
	description() {
		if(this.props.description){
			return (
				<div className="boxDescription">
					<p>{this.props.description}</p>
				</div>
			)
		}
	}
	hasBeenCompleted() {
		let style;
		if(this.props.completed){
			style = "boxImage boxImageCompleted";
		}else{
			style = "boxImage";
		}
		return style;
	}
	render() {
		return (
			<ReactCSSTransitionGroup
				transitionName={"fade"}
		        transitionAppear={true}
		        transitionAppearTimeout={500}
		        transitionEnterTimeout={500}
		        transitionLeaveTimeout={300}>
				<div className="headerBox">
					<div className={this.hasBeenCompleted()} style={this.props.style} >
							<div className="boxImageTextWrap">
								{this.icon()}
								<div className="boxImageText">
									<h4 className="boxTitle">{this.props.title}</h4>
									<h5 className="boxSubtitle">{this.props.subtitle}</h5>
								</div>
							</div>
					</div>
					{this.description()}
				</div>
			</ReactCSSTransitionGroup>
		);
	}
};

export default BigPictureComponent;
