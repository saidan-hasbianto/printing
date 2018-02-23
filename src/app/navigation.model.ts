export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'applications',
                'title'   : 'Applications',
                'type'    : 'group',
                'children': [
                    // {
                    //     'id'   : 'sample',
                    //     'title': 'Home',
                    //     'type' : 'item',
                    //     'icon' : 'home',
                    //     'url'  : '/sample'
                    // },
                    // {
                    //     'id'   : 'rws',
                    //     'title': 'RW',
                    //     'type' : 'item',
                    //     'icon' : 'account_balance',
                    //     'url'  : '/rws'
                    // },
                    // {
                    //     'id'   : 'rts',
                    //     'title': 'RT',
                    //     'type' : 'item',
                    //     'icon' : 'account_balance',
                    //     'url'  : '/rts'
                    // }
                ]
            },
            {
              'id'      : 'applications',
              'title'   : 'Master',
              'type'    : 'collapse',
              'icon'    : 'home',
              'children': [
                  {
                      'id'   : 'item',
                      'title': 'Item',
                      'type' : 'item',
                      'url'  : '/msitem'
                  },
                  {
                      'id'   : 'product',
                      'title': 'Product',
                      'type' : 'item',
                      'url'  : '/msproduct'
                  }
                ]
            }
        ];
    }
}
