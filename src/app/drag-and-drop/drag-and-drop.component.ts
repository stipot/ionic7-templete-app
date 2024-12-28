import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {

  list = [
    "(＾ワ＾) DRAG ME NOW!",
    "ヽ(・∀・)ﾉ DROP ME ANYWHERE!",
    "＼(^o^)／ I CAN BE DRAGGED!",
    "(≧▽≦) CATCH ME IF YOU CAN!",
    "(´∀`☆) PUSH ME TO MOVE!",
    "(o^▽^o) COME ON, DRAG ME!",
    "(๑>ᴗ<๑) SLIDE ME AROUND!",
    "(☆ω☆) I’M SO DRAGGABLE!",
    "(ノ^o^)ノ MOVE ME PLZ!",
    "(*≧∀≦*) DRAG AND SHOW ME OFF!",
    "(*ﾟ▽ﾟ*) I LOVE BEING DRAGGED!",
    "ʕ ≧㉨≦ ʔ DROP ME LIKE IT’S HOT!",
    "(✧∀✧) GO AHEAD, DRAG ME!",
    "(๑♡⌓♡๑) HANDS OFF? NAH, JUST DRAG ME!",
    "(*°▽°*) DRAGGING IS MY HOBBY!",
    "ƪ(˘⌣˘)ʃ DON’T DROP ME TOO HARD!",
    "(っ＾ω＾c) I LIKE TO BE MOVED!",
    "(*๓´╰╯`๓) BIG DRAG ENERGY!",
    "(💖∀💖) MOVE ME AROUND, BABY!",
    "（ノ◕ヮ◕）ノ*:・ﾟ✧ DRAG ME, I DARE YOU!",
    "ヽ(*⌒∇⌒*)ﾉ TRAVEL WITH ME!",
    "＼(≧▽≦)／ DRAG DRAG DRAG!",
    "ღ(｡☌ᴗ☌｡) PLEASE, CALL ME MR. DRAGGABLE!",
    "(⁎⁍̴̛ᴗ⁍̴̛⁎) A DRAG HERE, A DROP THERE!",
    "(੭ु ›ω‹ )੭ु⁾⁾ WHEE! LET’S GO DRAGGING!",
    "(⌒▽⌒) I’M YOURS TO DRAG!",
    "(☆^ー^☆) DON’T LEAVE ME BEHIND, DRAG ME!",
    "( ﾉ^ω^)ﾉﾟ JUST A LITTLE DRAG, PLEASE!",
    "(≧◡≦) IT’S DRAGGING TIME!",
    "(っ˘ω˘ς ) HELP ME MOVE AROUND!"
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
  }

  constructor() { }

  ngOnInit() { }

}
