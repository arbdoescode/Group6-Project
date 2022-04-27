import React, { Component } from "react";
import Select from "react-select";
import "./Input.css";

class Test2 extends Component {
  state = {};
  render() {
    return (
      <div className="Form">
        <div className="col-md-9">
          <div className="row">
            <div className="col-md-3">
              <div className="well">
                <label className="m-2">Kodi Produktit</label>
              </div>
            </div>
            <div className="col-md-3">
              <div className="well">
                <Select>
                  <option value="kodi1">D2D</option>
                </Select>
              </div>
            </div>

            <div className="col-md-3">
              <div className="well">
                <div className="checkbox checkbox-circle checkbox-color-scheme">
                  <label className="checkbox-checked">
                    <input type="checkbox" value="new" />
                    <span className="m-2">Shtese (Leke)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Test2;
