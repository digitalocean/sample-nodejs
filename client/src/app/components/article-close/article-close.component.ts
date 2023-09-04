import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-close',
  templateUrl: './article-close.component.html',
  styleUrls: ['./article-close.component.scss']
})
export class ArticleCloseComponent implements OnInit {

  constructor(private _articleService: ArticleService, private _snackBar: MatSnackBar, private _dialog: MatDialogRef<ArticleCloseComponent>,@Inject(MAT_DIALOG_DATA) public data: { _id: string }) {
  }

  ngOnInit(): void {
  }

  closeArticle(): void {
    this._articleService.closeArticle(this.data._id).subscribe({
      next: (data) => {
        this._snackBar.open('Article Closed', "", {
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
