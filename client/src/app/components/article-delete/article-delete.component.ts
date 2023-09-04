import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-delete',
  templateUrl: './article-delete.component.html',
  styleUrls: ['./article-delete.component.scss']
})
export class ArticleDeleteComponent implements OnInit {

  constructor(private _articleService: ArticleService, private _snackBar: MatSnackBar, private _dialog: MatDialogRef<ArticleDeleteComponent>,@Inject(MAT_DIALOG_DATA) public data: { _id: string }) {
  }

  ngOnInit(): void {
  }

  deleteArticle(): void {
    this._articleService.deleteArticle(this.data._id).subscribe({
      next: (data) => {
        this._snackBar.open('Article Deleted', "", {
          duration: 3000
        });
        this._dialog.close(true);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
