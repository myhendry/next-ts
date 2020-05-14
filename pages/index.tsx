import { Modal, Button, Icon } from "semantic-ui-react";

export default () => (
  <div className="centered">
    <Icon size="massive" name="world" />
    <div className="separator" />
    <Modal trigger={<Button primary>Show Modal</Button>}>
      <Modal.Header>
        <em>publicPath</em> should be set to <em>/_next/static/</em>
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <div className="wrapper">
            <div className="row">
              <p>
                Larger content should be still available as a fallback to{" "}
                <em>fileLoader</em> but it should not polute{" "}
                <em>/.next/static/css</em> folder. You should see two images
                below. One, smaller, loaded as data url, and one, bigger, loaded
                via url.
              </p>
            </div>

            <p className="border">
              You should also still be able to load regular css. This text
              should have border.
            </p>
          </div>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  </div>
);
