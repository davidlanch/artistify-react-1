import React, { Component } from 'react'

// Il faudra faire un menu déroulant pour l'artiste et le label
// et un cloudinary pour l'image

export default class NewAlbum extends Component {
    state = {
        title: "",
        releaseDate: "",
        //artist: "",
        cover: "",
        description: "",
        label: ""
    }


    render() {
        return (
            <div>
                <h2>Create a new album</h2>
                <form>

                    <label />
                    <input
                        name=""
                        type="text"
                        placeholder=""
                        onChange={this.handleChange}
                    />

                    <label />
                    <input
                        name=""
                        type="text"
                        placeholder=""
                        onChange={this.handleChange}
                    />

                    <label />
                    <input
                        name=""
                        type="text"
                        placeholder=""
                        onChange={this.handleChange}
                    />

                    <label />
                    <input
                        name=""
                        type="text"
                        placeholder=""
                        onChange={this.handleChange}
                    />
                    
                </form>
            </div>
        )
    }
}
