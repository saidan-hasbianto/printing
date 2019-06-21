import { AuthGuardAdminService } from './main/services/auth-guard.service';

export class NavigationModel
{
    public model: any[];
    public gr: string = localStorage.getItem('groupname');

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
                    {
                        'id'   : 'main',
                        'title': 'Home',
                        'type' : 'item',
                        'icon' : 'home',
                        'url'  : '/mainform'
                    }
                ]
            },
            {
              'id'      : 'system',
              'title'   : 'System',
              'type'    : 'collapse',
              'icon'    : 'settings',
              'privileges' : 'admin',
              'children': [
                {
                  'id'   : 'users',
                  'title': 'Users',
                  'type' : 'item',
                  'url'  : '/users',
                  'privileges' : 'admin'
                },
                {
                  'id'   : 'groups',
                  'title': 'Groups',
                  'type' : 'item',
                  'url'  : '/group',
                  'privileges' : 'user'
                },
                {
                  'id'   : 'docprefix',
                  'title': 'Doc Prefix',
                  'type' : 'item',
                  'url'  : '/docprefix',
                  'privileges' : 'user'
                }
              ]
            },
            {
              'id'      : 'master',
              'title'   : 'Master',
              'type'    : 'collapse',
              'icon'    : 'work',
              'privileges' : 'user',
              'children': [
                {
                    'id'   : 'item',
                    'title': 'Items',
                    'type' : 'item',
                    'url'  : '/msitem',
                    'privileges' : 'user'
                },
                {
                    'id'   : 'product',
                    'title': 'Products',
                    'type' : 'item',
                    'url'  : '/msproduct',
                    'privileges' : 'user'
                },
                {
                  'id'   : 'msactivity',
                  'title': 'Activities',
                  'type' : 'item',
                  'url'  : '/msactivity',
                  'privileges' : 'user'
                },
                {
                  'id'   : 'msmarketing',
                  'title': 'Marketings',
                  'type' : 'item',
                  'url'  : '/msmarketing',
                  'privileges' : 'user'
                },
                {
                  'id'   : 'msoperator',
                  'title': 'Operators',
                  'type' : 'item',
                  'url'  : '/msoperator',
                  'privileges' : 'user'
                },
              ]
            },
            {
              'id'      : 'receivable',
              'title'   : 'Receivable',
              'type'    : 'collapse',
              'icon'    : 'compare_arrows',
              'privileges' : 'operator',
              'children': [
                {
                  'id'   : 'mscustomer',
                  'title': 'Customers',
                  'type' : 'item',
                  'url'  : '/mscustomer',
                  'privileges' : 'operator'
                },
                {
                  'id'   : 'joborders',
                  'title': 'Job Orders',
                  'type' : 'collapse',
                  'children': [
                  {
                    'id'   : 'jonew',
                    'title': 'Create Job Order',
                    'type' : 'item',
                    'url'  : '/jobordernew',
                  // 'privileges' : 'user'
                  },
                  {
                    'id'   : 'joborders',
                    'title': 'Lists',
                    'type' : 'item',
                    'url'  : '/joborders',
                    'privileges' : 'operator',
                  }
                  ]
                },
                // {
                //   'id'   : 'deliveryorder',
                //   'title': 'Delivery Orders',
                //   'type' : 'item',
                //   'url'  : '/deliveryorder',
                //   'privileges' : 'user',
                // },
                {
                  'id'   : 'receipts',
                  'title': 'Receiptings',
                  'type' : 'item',
                  'url'  : '/receipts',
                  'privileges' : 'user',
                },
                {
                  'id'   : 'markupreleases',
                  'title': 'Markup Releases',
                  'type' : 'item',
                  'url'  : '/markupreleases',
                  'privileges' : 'user',
                },    
                {
                  'id'   : 'paymentreceipts',
                  'title': 'Payment Receipts',
                  'type' : 'item',
                  'url'  : '/paymentreceipts',
                  'privileges' : 'user',
                },                
              ]
            },
            {
              'id'      : 'payable',
              'title'   : 'Payable',
              'type'    : 'collapse',
              'icon'    : 'compare_arrows',
              'privileges' : 'user',
              'children': [
                {
                  'id'   : 'vendor',
                  'title': 'Vendors',
                  'type' : 'item',
                  'url'  : '/vendor'
                },
                {
                  'id'   : 'purch-item',
                  'title': 'Purchase Items',
                  'type' : 'item',
                  'url'  : '/purch-item'
                },
                {
                  'id'   : 'paym-purch-list',
                  'title': 'Payment Purchases',
                  'type' : 'item',
                  'url'  : '/paym-purch-list'
                }
              ]
          },
          {
            'id'      : 'report',
            'title'   : 'Reports',
            'type'    : 'collapse',
            'icon'    : 'bar_chart',
            'privileges' : 'admin',
            'children': [
              {
                'id'   : 'report',
                'title': 'Report',
                'type' : 'item',
                'url'  : '/reports'
              }
            ]
          }
        ];
        // if (this.gr !== 'Group Admin')
        // {

        //   this.model.splice(1, 1);
        //   // this.model.slic
        //   console.log(this.model);

        // }
    }

}
