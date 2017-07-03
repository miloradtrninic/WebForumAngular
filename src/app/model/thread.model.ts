/**
 * Created by komp on 6/22/2017.
 */
export class ThreadModel {
  constructor(public naturalID?: string, public parentSection?: string, public title?: string, public type?: string, public author?: string,
              public comments?: number[], public content?: any, public created?: string, public likes?: number, public dislikes?: number) {
    this.dislikes = 0;
    this.likes = 0;
    this.comments = [];
  }


}
