import { BlogService } from '../blog.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from '../blog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

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
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '417px',
      height: '220px',
    });

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
    console.log(this.searchBlog.toLowerCase());

    this.filteredBlogs = this.blogs.filter((blog:  {
      title:string,
     category:string,
     tag:string,
     description:string,
     author:string,
     displayDate:string,
     }) =>
     blog.title.toString().includes(this.searchBlog.toLowerCase()) ||
     blog.category.toString().includes(this.searchBlog)||
     blog.tag.toString().includes(this.searchBlog)||
     blog.description.toString().includes(this.searchBlog)||
     blog.author.toString().includes(this.searchBlog)||
     blog.displayDate.toString().includes(this.searchBlog)) ;
 }
  public searchBlog:string=''

  onClear() {
    this.searchBlog = '';
    this.filterBlogs();
 }

 panelOpenState = false;
}


