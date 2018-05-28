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
              'icon'    : 'work',
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
                  },
                  {
                    'id'   : 'users',
                    'title': 'Users',
                    'type' : 'item',
                    'url'  : '/users'
                  },
                  {
                    'id'   : 'groups',
                    'title': 'Groups',
                    'type' : 'item',
                    'url'  : '/group'
                  },
                  {
                    'id'   : 'msactivity',
                    'title': 'Activity',
                    'type' : 'item',
                    'url'  : '/msactivity'
                  },
                  {
                    'id'   : 'msmarketing',
                    'title': 'Marketing',
                    'type' : 'item',
                    'url'  : '/msmarketing'
                  },
                  {
                    'id'   : 'msoperator',
                    'title': 'Operator',
                    'type' : 'item',
                    'url'  : '/msoperator'
                  },
                  {
                    'id'   : 'mscustomer',
                    'title': 'Customer',
                    'type' : 'item',
                    'url'  : '/mscustomer'
                  },
                  {
                    'id'   : 'vendor',
                    'title': 'Vendor',
                    'type' : 'item',
                    'url'  : '/vendor'
                  }
                ]
              },
              {
                'id'      : 'applications',
                'title'   : 'Transaction',
                'type'    : 'collapse',
                'icon'    : 'swap_horiz',
                'children': [
                  {
                    'id'   : 'joborders',
                    'title': 'Job Orders',
                    'type' : 'item',
                    'url'  : '/joborders'
                  },
                  {
                    'id'   : 'deliveryorder',
                    'title': 'Delivery Order',
                    'type' : 'item',
                    'url'  : '/deliveryorder'
                  },
                  {
                    'id'   : 'receipts',
                    'title': 'Receipts',
                    'type' : 'item',
                    'url'  : '/receipts'
                  },
                  {
                    'id'   : 'markupreleases',
                    'title': 'Markup Release',
                    'type' : 'item',
                    'url'  : '/markupreleases'
                  },
                  {
                    'id'   : 'purch-item',
                    'title': 'Purchase Item',
                    'type' : 'item',
                    'url'  : '/purch-item'
                  },
                  {
                    'id'   : 'paym-purch-list',
                    'title': 'Payment Purchase List',
                    'type' : 'item',
                    'url'  : '/paym-purch-list'
                  },
                  {
                    'id'   : 'cashbook',
                    'title': 'Cashbook',
                    'type' : 'item',
                    'url'  : '/cashbook'
                  }
                ]
            }
        ];
    }
}
