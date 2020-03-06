// THIS COMPONENT DOES EVERYTHING CLIENT-SIDE, BUT WORKS ONLY
// FOR REALLY SMALL FILES, OR CRASHES THE BROWSER

import React, { Component } from 'react';
import crypto from 'crypto';

class Experiment extends Component {

    constructor() {
        super();
        this.state = {
            hashes: [],
            selectedFile: null
        }
    }

    render() {

        const handleChange = e => {
            this.setState({ selectedFile: e.target.files[0] });
        }

        const onClickHandler = () => {
            let file = this.state.selectedFile;
            let reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = () => {
                const buffer = toBuffer(reader.result);
                const md5Hash = crypto.createHash('md5').update(toBuffer(buffer)).digest("hex");
                const sha256Hash = crypto.createHash('sha256').update(toBuffer(buffer)).digest("hex");
                const sha1Hash = crypto.createHash('sha1').update(toBuffer(buffer)).digest("hex");
                this.setState({
                    hashes:
                        [
                            {
                                cypher: 'md5',
                                hashed: md5Hash
                            },
                            {
                                cypher: 'sha256',
                                hashed: sha256Hash
                            },
                            {
                                cypher: 'sha1',
                                hashed: sha1Hash
                            }
                        ]
                });
            };

            reader.onerror = () => {
                console.log(reader.error);
            };

            function toBuffer(ab) {
                var buf = Buffer.alloc(ab.byteLength);
                var view = new Uint8Array(ab);
                for (var i = 0; i < buf.length; ++i) {
                    buf[i] = view[i];
                }
                return buf;
            }
        }

        return (
            <div className="Form">
                <p>Upload a file and get the checksums</p>

                <input type="file" onChange={handleChange} />
                <button onClick={onClickHandler}>Send</button>
                <ul>
                    {this.state.hashes ? (
                        this.state.hashes.map(hash => <li key={hash.cypher}>{hash.cypher}: {hash.hashed}</li>)
                    )
                        : null}
                </ul>
            </div>
        );
    }
}

export default Experiment;
