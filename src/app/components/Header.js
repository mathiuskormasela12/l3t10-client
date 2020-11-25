import React from 'react';
import styled from '../style/header.module.scss';

function Header(props) {
	return(
		<header className={ styled.header }>
			<h1>{ props.title }</h1>
		</header>
	);
}

export default Header;
