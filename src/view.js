/*
Use LookAt to set the camera position and viewing Direction. This matrix is the
ViewMatrix. Test that this is working by just changing the numbers in LookAt
Directly in the code and verifying that the camera behaves as you think it
should. For instance, move forward a little, or back a little. LookAt
(eye=(0,0,0), at-(0,0,-1), up=(0,1,0)) should produce an identity matrix I
think, so its a fine starting point for LookAt(). The start of chap 7 discusses
LookAt().
*/
class View {

    constructor(shader) {
        //set speed of movement
        this.speed = 0.3;

        // Set up some global variables to keep the eye, at, up vectors.
        //Change your code to use these variables in your drawScene() routine.
        this.eye     = new Vector3([0, 0, 1]);
        this.center  = new Vector3([0, 0, 0]);
        this.up      = new Vector3([0, 1, 0]);

        this.viewMatrix = new Matrix4();
        this.updateView();

        this.rotationMatrix = new Matrix4();

        this.projectionMatrix = new Matrix4();
        this.projectionMatrix.setPerspective(30, 1, 1, 100);
    }

    truck(DIR) {
        // Calculate the n camera axis
        var n = this.eye.sub(this.center);
        n = n.normalize()

        // Calculate the u camera axis
        var u = this.up.cross(n);
        u = u.normalize();

        // Scale the u axis to the desired distance to move
        u = u.mul(DIR * this.speed);

        // Add the Direction vector to both the eye and center positions
        this.eye = this.eye.add(u);
        this.center = this.center.add(u);

        this.updateView();
    }

    zoom(DIR) {
        // Calculate the n camera axis
        var n = this.eye.sub(this.center);
        n = n.normalize()

        // Calculate the u camera axis
        var u = this.up.cross(n);
        u = u.normalize();

        // Scale the n axis to the desired distance to move
        n = n.mul(DIR * this.speed);

        // Add the Direction vector to both the eye and center positions
        this.eye = this.eye.add(n);
        this.center = this.center.add(n);

        this.updateView();
    }

    dolly(DIR) {
        // Calculate the n camera axis
        var n = this.eye.sub(this.center);
        n = n.normalize()

        // Calculate the u camera axis
        var u = this.up.cross(n);
        u = u.normalize();

        // Scale the n axis to the desired distance to move
        n = n.mul(DIR * this.speed);

        // Add the Direction vector to both the eye and center positions
        this.eye = this.eye.add(n);
        this.center = this.center.add(n);

        this.updateView();
    }

    pan(DIR) {
        // Pivot eye, rotate v
        var v = this.up.normalize();

        var ocenter = new Vector3();
        ocenter = this.center.sub(this.eye);

        this.rotationMatrix.setRotate(DIR * 0.25, v.elements[0], v.elements[1], v.elements[2]);
        var rcenter = this.rotationMatrix.multiplyVector3(ocenter);

        this.center = rcenter.add(this.eye);
        this.updateView();
    }

    tilt(DIR) {
        // Pivot eye, rotate u

        var n = this.eye.sub(this.center);
        n = n.normalize();

        var u = this.up.cross(n);
        u = u.normalize();

        var ocenter = new Vector3();
        ocenter = this.center.sub(this.eye);

        this.rotationMatrix.setRotate(DIR * 0.25, u.elements[0], u.elements[1], u.elements[2]);

        var rcenter = this.rotationMatrix.multiplyVector3(ocenter);
        this.center = rcenter.add(this.eye);

        this.updateView();
    }

    setOrtho() {
        this.projectionMatrix.setOrtho(-1, 1, -1, 1, 1, 100);
    }

    updateView() {
        this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
                                  this.center.elements[0], this.center.elements[1], this.center.elements[2],
                                  this.up.elements[0], this.up.elements[1], this.up.elements[2]);
    }
}
