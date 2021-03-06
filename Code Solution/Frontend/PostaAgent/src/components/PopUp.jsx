import React from "react";
import { Icon, Popup } from "semantic-ui-react";

const PopupExampleWide = () => (
  <div>
    <Popup trigger={<Icon circular name="star" />}>
      Hello. This is a regular pop-up which does not allow for lots of content.
      You cannot fit a lot of words here as the paragraphs will be pretty
      narrow.
    </Popup>
    <Popup trigger={<Icon circular name="star" />} wide>
      Hello. This is a wide pop-up which allows for lots of content with
      additional space. You can fit a lot of words here and the paragraphs will
      be pretty wide.
    </Popup>
    <Popup trigger={<Icon circular name="star" />} wide="very">
      Hello. This is a very wide pop-up which allows for lots of content with
      additional space. You can fit a lot of words here and the paragraphs will
      be pretty wide.
    </Popup>
  </div>
);

export default PopupExampleWide;
