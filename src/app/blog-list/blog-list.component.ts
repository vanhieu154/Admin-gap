import { BlogService } from '../blog.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../blog';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {

  displayedColumns: string[] = ['position', 'title', 'category', 'tag', 'author','displayDate', 'select'];

  blog = new Blog();
  blogs:any;
  errMessage:string=''
  http: any;
  constructor(private _service: BlogService,private dialog: MatDialog, private router:Router){
    this._service.getBlogs().subscribe({
      next:(data)=>{this.blogs=data},
      error:(err)=>{this.errMessage=err}
    })
  }

CreateNew() {
  this.router.navigate([`add-blog`]);
}

deleteBlog(_id:any)
  {
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this._service.deleteBlog(_id).subscribe({
          next:(data)=>{this.blogs=data},
          error:(err)=>{this.errMessage=err}
        })
        window.location.reload()
      }
    });

  }
  Edit(b:any){
    this.router.navigate(['blog-edit',b._id])
  }

  // search Blog
  filteredBlogs: any[] | undefined;
  filterBlogs() {
     this.filterBlogs = this.blogs.filter((blog:  { title: string; category: string; tag: string;author :string; }) =>
     blog.title.toString().includes(this.searchBlog.toLowerCase()) ||
     blog.category.toLowerCase().includes(this.searchBlog.toLowerCase()) ||
     blog.tag.toLowerCase().includes(this.searchBlog.toLowerCase()) ||
     blog.author.toLowerCase().includes(this.searchBlog.toLowerCase()));
  }
  public searchBlog:string=''

  onClear() {
    this.searchBlog = '';
    this.filterBlogs();
 }

}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog-component.component.html',
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
