import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent {
  public Editor = ClassicEditor;
  blog=new Blog();
  blogs:any
  errMessage:string=''
  id: any;
   constructor(private _service:BlogService,private activateRoute:ActivatedRoute,private router:Router,private http: HttpClient, public dialog: MatDialog){
    activateRoute.paramMap.subscribe(
      (param)=>{
        this.id=param.get('id')
        if(this.id!=null)
        {
          this._service.getBlog(this.id).subscribe({
            next:(data)=>{this.blog=data},
            error:(err)=>{this.errMessage=err}
          })

        }
      }
    )
    this._service.getBlogs().subscribe({
     next:(data)=>{this.blogs=data},
     error:(err)=>{this.errMessage=err}
   })
   }

   putBlog()
   {
      this.blog.description=this.blog.description.replace(/<\/?p>/gi, '');
      this.blog.displayDate= new Date(Date.now())
      this._service.putBlog(this.blog).subscribe({
       next:(data)=>{this.blogs=data},
       error:(err)=>{this.errMessage=err}
     })
     const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '417px',
      height: '220px',
    });
    dialogRef.afterClosed().subscribe(() => {
    this.router.navigate(['blog-list'])
    });
   }

  onFileSelected(event: any,blog:Blog) {
    let me = this;
    let files = event.target.files;
    for(let i = 0; i < files.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = function () {
        blog.img.push(reader.result!.toString());
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  onDeleteImage(index: number) {
    this.blog.img.splice(index, 1);
  }
}
