import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {

  public Editor = ClassicEditor;

  blog= new Blog();
  errMessage:string=''
  selectedFiles: File[] = [];
  constructor(private _service: BlogService,private router:Router,private http: HttpClient){}
  public setBlog(b:Blog)
  {
    this.blog=b
  }

  postBlog()  {
    this._service.postBlog(this.blog).subscribe({
      next:(data)=>{this.blog=data},
      error:(err)=>{this.errMessage=err}
    })
    alert("thành công")
    this.router.navigate(['blog-list'])
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
