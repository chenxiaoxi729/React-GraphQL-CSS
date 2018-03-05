import React, { Component } from 'react';
//lib be make us write queries inside a js file
import gql from 'graphql-tag';
//react-apollo is like a glue layer between graphql and apollo data source
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/fetchSongs';

class SongList extends Component {
    onSongDelete(id) {
        this.props.mutate({ variables: { id: id } })
            .then(() => this.props.data.refetch());
            //refetch() re-execute any queries associated with SongList Component, do changes to its component
    }
    renderSongs() {
        return this.props.data.songs.map(({ id, title }) => {
            return  (
                <li key={id} className="collection-item">
                  {title} 
                  <i className="material-icons" onClick={() => this.onSongDelete(id)}>
                    delete
                  </i>
                </li>
            );
        });
    }
    render() {
        if (this.props.data.loading) { return <div>Loading...</div>;}
        return (
            <div>
                <ul className="collection">
                     {this.renderSongs()}
                </ul>
                <Link to="/songs/new" className="btn-floatinf btn-large red right">
                    <i className="material-icons">add</i>
                </Link>
            </div>
        );
    }
}

const mutation = gql`
    mutation DeleteSong($id: ID) {
        deleteSong(id: $id) {
            id
        }
    }
`;

export default graphql(mutation)(    
    graphql(query)(SongList)
);