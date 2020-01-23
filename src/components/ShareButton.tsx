import React from 'react';
import SiteConfig from '../../config/SiteConfig';
import { LinkedInIcon, TwitterIcon } from './Icons';
import { Button } from './Button';

export interface Props {
  title: string;
  slug: string;
  target: 'LinkedIn' | 'Twitter';
  onlyIcon: boolean;
}

export class ShareButton extends React.PureComponent<Props> {
  public render() {
    const { title, slug, onlyIcon, target } = this.props;

    const fullUrl = this.componeUrl(SiteConfig.siteUrl, SiteConfig.blogPath, slug);

    if (target === 'LinkedIn') {
      const baseHref = 'https://www.linkedin.com/shareArticle?mini=true&url={POST_URL}&title={POST_TITLE}&source=LinkedIn';

      let finalHref = baseHref.replace('{POST_URL}', fullUrl);
      finalHref = finalHref.replace('{POST_TITLE}', encodeURI(title));
      console.log(finalHref);

      if (onlyIcon) {
        return (
          <a href={finalHref}>
            <LinkedInIcon />
          </a>
        );
      }
      return (
        <a href={finalHref} title="Share on LinkedIn">
          <Button>
            <LinkedInIcon />
            <span>Share</span>
          </Button>
        </a>
      );
    }

    if (target === 'Twitter') {
      const baseHref = 'https://www.linkedin.com/shareArticle?mini=true&url={POST_URL}&title={POST_TITLE}&source=LinkedIn';

      let finalHref = baseHref.replace('{POST_URL}', fullUrl);
      finalHref = finalHref.replace('{POST_TITLE}', encodeURI(title));
      console.log(finalHref);

      if (onlyIcon) {
        return (
          <a href={finalHref}>
            <TwitterIcon />
          </a>
        );
      }
      return (
        <a href={finalHref} title="Share on Twitter">
          <Button>
            <TwitterIcon />
            <span>Share</span>
          </Button>
        </a>
      );
    }

    return <span />;
  }

  // return(
  //     <svg xmlns = "http://www.w3.org/2000/svg" width = "24" height = "24" viewBox = "0 0 24 24" >
  //     <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
  //     </svg>
  //   );
  // }

  public componeUrl = function(...parts: string[]): string {
    const trimmed = parts.map(x => {
      let tmp = x;
      if (tmp.startsWith('/')) tmp = x.substring(1, tmp.length);
      if (tmp.endsWith('/')) tmp = tmp.substring(0, tmp.length - 1);
      return tmp;
    });
    return trimmed.join('/');
  };
}
