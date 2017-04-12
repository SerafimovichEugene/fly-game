function background(context) {
    this.context = context;
    this.image = new Image();
    this.image.src = 'img/background2.png';
    this.width = 1152;
    this.heigth = 648;
    this.step = 0;
};

background.prototype.renderBackground = function () {

    ++this.step;
    if (this.step == this.width) {
        this.step = 0;
    }
    this.context.drawImage(this.image, 0, 0, this.step, this.heigth, this.width - this.step, 0, this.step, this.heigth);
    this.context.drawImage(this.image, this.step, 0, this.width - this.step, this.heigth, 0, 0, this.width - this.step, this.heigth);
};

module.exports = background;
