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
                    'title': 'Item',
                    'type' : 'item',
                    'url'  : '/msitem',
                    'privileges' : 'user'
                },
                {
                    'id'   : 'product',
                    'title': 'Product',
                    'type' : 'item',
                    'url'  : '/msproduct',
                    'privileges' : 'user'
                },
                {
                  'id'   : 'groups',
                  'title': 'Groups',
                  'type' : 'item',
                  'url'  : '/group',
                  'privileges' : 'user'
                },
                {
                  'id'   : 'mscustomer',
                  'title': 'Customer',
                  'type' : 'item',
                  'url'  : '/mscustomer',
                  'privileges' : 'user'
                },
                {
                  'id'   : 'msactivity',
                  'title': 'Activity',
                  'type' : 'item',
                  'url'  : '/msactivity',
                  'privileges' : 'user'
                },
                {
                  'id'   : 'msmarketing',
                  'title': 'Marketing',
                  'type' : 'item',
                  'url'  : '/msmarketing',
                  'privileges' : 'user'
                },
                {
                  'id'   : 'msoperator',
                  'title': 'Operator',
                  'type' : 'item',
                  'url'  : '/msoperator',
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
              'id'      : 'receivable',
              'title'   : 'Receivable',
              'type'    : 'collapse',
              'icon'    : 'compare_arrows',
              'privileges' : 'operator',
              'children': [
                {
                  'id'   : 'joborders',
                  'title': 'Job Orders',
                  'type' : 'item',
                  'url'  : '/joborders',
                  'privileges' : 'operator',
                },
                {
                  'id'   : 'deliveryorder',
                  'title': 'Delivery Order',
                  'type' : 'item',
                  'url'  : '/deliveryorder',
                  'privileges' : 'user',
                },
                {
                  'id'   : 'receipts',
                  'title': 'Receipting',
                  'type' : 'item',
                  'url'  : '/receipts',
                  'privileges' : 'user',
                },
                {
                  'id'   : 'markupreleases',
                  'title': 'Markup Release',
                  'type' : 'item',
                  'url'  : '/markupreleases',
                  'privileges' : 'user',
                }
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
                  'title': 'Vendor',
                  'type' : 'item',
                  'url'  : '/vendor'
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
