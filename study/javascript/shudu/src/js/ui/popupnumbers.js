//用于弹框


module.exports = class PopupNumbers{
    constructor($panel){
        this._$panel = $panel;
        this._$panel.hide();
        this._$panel.on('click','span',(e) =>{
            const $span = $(e.target);
            this._$panel.hide();
            if($span.hasClass('mark1')){
                if(this._targetCell.hasClass('mark1')){
                    this._targetCell.removeClass('mark1 mark2')
                }else(
                    this._targetCell.addClass('mark1')
                )
                return;
            }
            if($span.hasClass('mark2')){
                if(this._targetCell.hasClass('mark2')){
                    this._targetCell.removeClass('mark1 mark2')
                }else(
                    this._targetCell.addClass('mark2')
                )
                return;
            }
            if($span.hasClass('empty')){
                this._targetCell.removeClass('mark1 mark2').addClass('empty').text("0");
                return
            }
            this._targetCell.removeClass("empty").text($span.text());
        })
    }
    popup($cell){
        this._targetCell = $cell;
        let {left,top} = $cell.position();
        const width  = $cell.width();
        const height = $cell.height();
        if($('body').width()-left-width>121){
            left = left+width;
        }else{
            left = left-121;
        }
        if(top>300){
            top = top-161;
        }
        this._$panel.show();
        this._$panel.css({
            left,top
        })
    }
}