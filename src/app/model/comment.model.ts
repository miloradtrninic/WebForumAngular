/**
 * Created by komp on 6/23/2017.
 */
export class CommentModel {

  constructor(public id?: number, public author?: string, public thread?: string, public date?: string,
              public parent?: number, public subComments?: number[],
              public text?: string, public likes?: number, public dislikes?: number, public edited?: boolean) {
    this.dislikes = 0;
    this.likes = 0;
    this.edited = false;
    this.subComments = [];
  }

}
